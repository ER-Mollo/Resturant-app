import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/color';
import {addDoc, collection,doc, deleteDoc,getDocs,query,where} from 'firebase/firestore';
import { db } from '../config/firebase';
import { PrimaryButton } from '../const/Button';





const CartScreen = ({navigation}) => {
  const [foods,setFoods]= React.useState([]);
  const [num,setnum]=React.useState(1);
  const [prices,setPrices]=React.useState([]);
  

  let count = 1

 

   
  const cart=[]


  const cartRef = collection(db,"cart");



  const getItems = async()=>{
      
    console.log(cartRef);
  
    let data = await getDocs(cartRef);
      setFoods(data.docs.map((doc)=>({...doc.data(),id: doc.id})))

      setPrices(data.docs.map((doc)=>(doc.data().price)));

      
      
    }

    const sum = prices.reduce((partialSum, a) => partialSum + a, 0)
    console.log(sum);

    const deleteFood = async(id)=>{

      console.log(cartRef,id);
      let task = doc(cartRef,id);
      console.log('task: ')
      // return
      await deleteDoc(task).then(
          promise => {
              alert("deleted");
              getItems();
          }
      ).catch()
      getItems();


      
    }



    React.useEffect(()=>{
      console.log("some")
      getItems();
      console.log(prices);
      
     }, [])

  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: COLORS.white}}>{item.foodName}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.ingridients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold', color: COLORS.white}}>R{item.price}</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          
          <TouchableOpacity style={style.actionBtn} onPress={() => deleteFood(item.id)}>
            <Icon name="remove" size={25} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark, flex: 1}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{ color: COLORS.white}}/>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={foods}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold',color:COLORS.white}}>
                Total Price
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold',color:COLORS.white}}>R{sum}</Text>
            </View>
            <View style={{marginHorizontal: 30}}>
              <PrimaryButton title="CHECKOUT" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.dark,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 40,
    height: 90,
    backgroundColor: 'rgb(238, 75, 43)',
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CartScreen;
