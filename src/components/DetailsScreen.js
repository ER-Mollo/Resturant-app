import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,ScrollView} from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/color';
import {SecondaryButton} from '../const/Button';

const DetailsScreen = ({navigation, route}) => {
  const food = route.params;

  const addToCart = async() =>{
    await  addDoc(collection(db,"cart"),{foodName:food.name,price:food.price,ingridients:food.ingridients,num:1,image:food.image})
    console.log('added');
  }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{color:COLORS.light}} />
        <Text style={{fontSize: 20, fontWeight: 'bold',color: COLORS.light}}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={food.image} style={{height: 220, width: 220}} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.dark}}>
              {food.name}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>
            {food.ingridients}
          </Text>
          <View style={{marginTop: 40, marginBottom: 40}}>
            <SecondaryButton title="Add To Cart" onPress={addToCart}/>
          </View>
        </View>
      </ScrollView>
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
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.dark,
  },
});

export default DetailsScreen;
