import { END, EventChannel } from 'redux-saga';
import { put, call, take, spawn } from 'redux-saga/effects';

import { SlowDown } from '../../../utils';
import * as accountActions from '../../account/actions';
import * as connectWallet from '../../provider/actions';
import * as walletStateSliceActions from '../../slice';
import { LoadingStatusType } from '../../types/LoadingStatus';
import { WalletState } from '../../types/WalletState';
import { IWalletNetworkApi } from '../IWalletNetworkApi';
import * as slicesActions from '../slice';
import { Network } from '../types/Network';
import { NetworkLoadState } from '../types/NetworkLoadState';

export function* ActionEffectLoadNetwork(walletApi: IWalletNetworkApi) {
  yield put(walletStateSliceActions.setLoading(LoadingStatusType.PENDING));
  yield put(walletStateSliceActions.setState(WalletState.CHECKING_NETWORK));
  const isNetworkLoaded: boolean = yield call(
    HandleStateNetworkRequested,
    walletApi
  );
  if (isNetworkLoaded) {
    yield put({ type: accountActions.waitSignIn.type });
  } else {
    yield put(walletStateSliceActions.setLoading(LoadingStatusType.IDLE));
  }
}

export function* HandleStateNetworkRequested(
  walletNetworkApi: IWalletNetworkApi
) {
  let isSuccessful: boolean = false;
  try {
    yield put(
      slicesActions.setNetworkLoadState(NetworkLoadState.NETWORK_REQUESTED)
    );
    yield call(SlowDown);
    const network: Network = yield call(walletNetworkApi.loadNetwork);
    if (network === undefined || network === null) {
      throw new Error('Wrong network');
    }
    yield put(slicesActions.setNetwork(network));
    yield put(
      slicesActions.setNetworkLoadState(NetworkLoadState.NETWORK_LOADED)
    );
    isSuccessful = true;
    yield spawn(handleEventNetworkChanged, walletNetworkApi);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    if (errorMessage === 'Wrong network') {
      yield call(HandleStateWrongNetwork);
    } else {
      yield call(HandleStateNetworkDetectionFailed, errorMessage);
    }
  } finally {
    return isSuccessful;
  }
}

export function* HandleStateNetworkDetectionFailed(error: string) {
  yield put(walletStateSliceActions.setError(error));
  yield put(
    slicesActions.setNetworkLoadState(NetworkLoadState.NETWORK_DETECTION_FAILED)
  );
}

export function* HandleStateWrongNetwork() {
  yield put(slicesActions.setNetworkLoadState(NetworkLoadState.WRONG_NETWORK));
}

export function* handleEventNetworkChanged(
  walletNetworkApi: IWalletNetworkApi
) {
  const channel: EventChannel<string> = yield call(
    walletNetworkApi.listenNetworkChange
  );
  try {
    while (true) {
      yield take(channel);
      yield put(accountActions.disconnectWallet());
      yield call(walletNetworkApi.handleNetworkChange);
      yield put(connectWallet.connectWallet());
      // take(END) will cause the saga to terminate by jumping to the finally block
      yield take(END.type);
      break;
    }
  } finally {
    channel.close();
  }
}
