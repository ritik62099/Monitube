import { createStackNavigator } from '@react-navigation/stack';
import DeliveryPage from './Delivery ';
import RepairPage from './Repair ';
import InstallationPage from './Installation';
import Analytics from './analyticsspecialist';
import Channel from './channelmanager';
import Content from './Contentcreator';
import Script from './scriptwriter';
import Seo from './seospecialist';
import Thumbnail from './thumbnaildesigner';
import Advertiser from './youtubeadvertiser';

const Stack = createStackNavigator();

const ServiceNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Delivery" component={DeliveryPage} />
            <Stack.Screen name="Repair" component={RepairPage} />
            <Stack.Screen name="Installation" component={InstallationPage} />
            <Stack.Screen name="Analytics" component={Analytics} />
            <Stack.Screen name="Channel" component={Channel} />
            <Stack.Screen name="Content" component={Content} />
            <Stack.Screen name="Script" component={Script} />
            <Stack.Screen name="Seo" component={Seo} />
            <Stack.Screen name="Thumbnail" component={Thumbnail} />
            <Stack.Screen name="Advertiser" component={Advertiser} />
        </Stack.Navigator>
    );
};

export default ServiceNavigator;
