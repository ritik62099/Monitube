// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './components/Login';
// import SignupScreen from './components/Signup';
// import ForgotPasswordScreen from './components/ForgotPasswordScreen';
// import HomeScreen from './components/Home';
// import { AuthProvider } from './context/AuthContext';

// const Stack = createStackNavigator();

// // const AppNavigator = () => {
// //   return (
// //     <Stack.Navigator>
// //       <Stack.Screen name="Login" component={LoginScreen} />
// //       <Stack.Screen name="Signup" component={SignupScreen} />
// //       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
// //       <Stack.Screen name="Home" component={HomeScreen} />
// //     </Stack.Navigator>
// //   );
// // };

// const App = () => {
//     return (
//         <AuthProvider>
//             <NavigationContainer>
//                 <Stack.Navigator initialRouteName='Home'>
//                     <Stack.Screen name="Signup" component={SignupScreen} />
//                     <Stack.Screen name="Login" component={LoginScreen} />
//                     <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//                     <Stack.Screen name="Home" component={HomeScreen} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         </AuthProvider>
//     );
// };

// export default App;


// App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/Login';
import SignupScreen from './components/Signup';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import HomeScreen from './components/Home';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ActivityIndicator, View,Text,TouchableOpacity, ScrollView } from 'react-native';
import AddProduct from './screens/AddProduct';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import UserProductsScreen from './components/userproduct';
import ServicesPage from './components/servicespages/Service';
import Navigation from './components/servicespages/navigation'

import DeliveryPage from './components/servicespages/Delivery ';
import RepairPage from './components/servicespages/Repair ';
import InstallationPage from './components/servicespages/Installation';

import Analytics from './components/servicespages/analyticsspecialist';
import Advertiser from './components/servicespages/youtubeadvertiser';
import Channel from './components/servicespages/channelmanager';
import Content from './components/servicespages/Contentcreator';
import Script from './components/servicespages/scriptwriter';
import Seo from './components/servicespages/seospecialist';
import Thumbnail from './components/servicespages/thumbnaildesigner';
import About from './components/About';
import HelpCenter from './components/helpcenter';

import { CartProvider } from './context/CartContext'; // Import CartProvider
import { BookingHistoryProvider } from './context/BookingHistoryContext'; // Import the provider

// import Cart from './components/tabpage/historybooking';
import BookingHistory from './components/tabpage/historybooking';

// import Headerright from './components/Profile';
import Profilepage from './components/tabpage/profilepage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    // Show a loading spinner while checking login status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <CartProvider> 
   <BookingHistoryProvider>
    <Stack.Navigator>
      {userToken ? (
        // If token is present, show HomeScreen
        <>
          {/* <Stack.Screen name="Home" component={HomeScreen} 
            options={
              ({ navigation }) => ({
              headerTitle: 'Home',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                  <Text style={{ marginRight: 15, fontSize: 16, color: 'blue' }}>Cart</Text>
                </TouchableOpacity>
              ),
            }) }
            
          /> */}

          <Stack.Screen name="Home" options={{headerShown : false}} component={HomeScreen} 
           
            
          />
          <Stack.Screen name="Addproduct" component={AddProduct} />
          <Stack.Screen name="Productlist" component={ProductList} />
          <Stack.Screen name="Productdetails" component={ProductDetails} />
          <Stack.Screen name="Userproduct" component={UserProductsScreen}/>
          {/* <Stack.Screen name="Cart" component={Cart}/> */}
          <Stack.Screen name="bookinghistory" component={BookingHistory}/>
          {/* <Stack.Screen name="navigation" component={Navigation}/> */}
          {/* <Stack.Screen name="profile" component={Headerright} options={{ headerTitle: 'Profile' }} /> */}


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
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Helpcenter" component={HelpCenter} />
            <Stack.Screen name="Profile" component={Profilepage} />
          {/* <Stack.Screen name='service' component={ServicesPage}/> */}
        </>
      ) : (
        // Else, show Login and Signup screens
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgotpassword" component={ForgotPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
    </BookingHistoryProvider>
    </CartProvider>
  );
};

const App = () => {
  return (
    
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
    
  );
};

export default App;
