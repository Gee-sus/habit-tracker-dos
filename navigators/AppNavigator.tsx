import {View, Text} from "tamagui";
import { useAuth } from '../contexts/AuthContext'
import { Auth } from '../components/auth'
import { MainLayout } from '../layouts/MainLayout'

export const AppNavigator = () => {
    const {userId, loading} = useAuth();


    if(loading) {
        return (
            <View flex={1} justifyContent="center" alignItems="center">
                <Text>
                    loading...
                </Text>
            </View>
        )
    }

    if(!userId) {
        return <Auth />;
    }

    return <MainLayout />



}