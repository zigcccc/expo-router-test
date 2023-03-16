import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, { trackGlobalErrors, asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

export default Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Expo Router Test',
  })
  .useReactNative()
  .use(asyncStorage({}))
  .use(
    trackGlobalErrors({
      veto: (frame) => frame.fileName.indexOf('/node_modules/react-native/') >= 0,
    })
  )
  .use(reactotronRedux())
  .connect();
