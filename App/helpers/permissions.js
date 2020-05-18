import {Alert, PermissionsAndroid} from 'react-native'; 

export const getStoragePermissions = async () => {
    const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, 
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, 
    ], 
    {
        title: 'MPlay Permissions', 
        message: 'MPlay cần truy cập bộ nhớ của bạn'
    })

    if (permissions['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
        return; 
    } else {
        Alert.alert(
            'Cho phép MPlay truy cập bộ nhớ?',
            [{text: 'Đồng ý', onPress: async () => getStoragePermissions() }], 
            {cancelable: false}
        )
    }
}

export const checkStoragePermissions = async () => {
    const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ); 
    return granted;
}