import React, { useReducer } from 'react';
//import react native components
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';


//styling imports
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/color';
import categories from '../const/categories';


//firebase imports
import { db } from '../config/firebase';
import {addDoc, collection,doc, deleteDoc,getDocs,query,where} from 'firebase/firestore';
import { async } from '@firebase/util';
import { auth } from '../config/firebase';
// import BottomNavigator from '../const/bottomNav';


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({navigation, route}) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [foods,setFoods]= React.useState([]);
    const [foodName,setFoodName]=React.useState('');
    const [foodIngridients,setFoodIngridients]=React.useState('')
    const [foodPrice,setFoodPrice]=React.useState('')
    const [addCart,setAddCart]=React.useState(false)

    const cart = [];
    const theFoods = [];

    const foodRef =collection(db,"foods");
    const cartRef = collection(db,"cart");
   

    const user = auth.currentUser;
    console.log(user);


  

    const getItems = async()=>{


      
      console.log(foodRef);
    
      let data = await getDocs(foodRef);

      const q = query(collection(db, "foods"));
        const querySnapshot = await getDocs(q)
        

        querySnapshot.forEach((doc) => {
        
          console.log(doc.data())
          theFoods.push({id:doc.id , name: doc.data().name,ingridients:doc.data().ingridients, price:doc.data().price,cart:addCart})
      });


       setFoods(theFoods);
      
      }




      const addToCart = async() =>{
       
        setAddCart(true);

      console.log(foods)

      foods.forEach((doc) => {
        console.log(doc.name)
      })
     
     }
     




      function some(){
        
        
        for (var i=0; i < foods.length; i++){
          
           

            if(foods[i].category==="drinks"){
              console.log(foods[i].name)
              setFoodName(foods[i].name)
              setFoodPrice(foods[i].price)
              setFoodIngridients(foods[i].ingridients)
              
            }
           
        }
        
      }
      

      React.useEffect(()=>{
        console.log("some")
        getItems();
        console.log(getItems());
        
       }, [])


    const ListCategories = () => {
        return (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.categoriesListContainer}>


            {categories.map((category, index) => (

              <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedCategoryIndex(index)}>
                <View style={{backgroundColor: selectedCategoryIndex == index ? COLORS.primary : COLORS.secondary, ...style.categoryBtn, }}>

                  <View style={style.categoryBtnImgCon}>
                    <Image source={category.image} style={{height: 35, width: 35, resizeMode: 'cover',borderRadius:20}}/>
                  </View>

                  <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10,
                      color: selectedCategoryIndex == index
                          ? COLORS.dark
                          : COLORS.primary,
                    }}>

                    {category.name}

                  </Text>

                </View>
              </TouchableOpacity>
            ))
            }
          </ScrollView>
        );
      };

      // style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}

      const Card = () => {
        return(

          
          <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',padding:10}}>
                {
                  
                  foods.map(food=>((

                        <TouchableHighlight
                        underlayColor={COLORS.white}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('detail',food)}
                        key={food.id}> 
                      
                            
                            <View style={style.card} > 
                                
                                <View style={{alignItems: 'center', top: -40}}>
                                  <Image source={require('../const/asserts/catergories/drink.jpg')} style={{height: 120, width: 120,borderRadius:100}} />
                                </View>
                                <View style={{marginHorizontal: 20}}>
                                  <Text style={{fontSize: 18, fontWeight: 'bold',color:COLORS.white}}>{food.name}</Text>
                                  <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
                                    {food.ingridients}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    marginTop: 10,
                                    marginHorizontal: 20,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text style={{fontSize: 18, fontWeight: 'bold',color:COLORS.white}}>
                                    R{food.price}
                                  </Text>
                                  <TouchableOpacity style={style.addToCartBtn} onPress={async() =>  
                                      { 
   
                                        await  addDoc(collection(db,"cart"),{foodName:food.name,price:food.price,ingridients:food.ingridients})
                                        console.log('added')
                                      }
                                    }
                                    >
                                    <Icon name="add" size={20} color={COLORS.dark} />
                                  </TouchableOpacity>
                                </View>
                            </View>
                           
                      </TouchableHighlight>
              )))
            } 
  
        </View>

        )
      }


      return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.dark}}>
            <View style={[style.header,style.shadowProp]}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 28, color: COLORS.white}}>Hello,</Text>
                        <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10, color: COLORS.white}}>
                        {user.displayName}
                        </Text>
                    </View>
                </View>
                <Image
                source={require('../../assets/icon.png')}
                style={{height: 50, width: 50, borderRadius: 25, paddingBottom:15}}
                />
            </View>

            <View style={{ marginTop: 40, flexDirection: 'row', paddingHorizontal: 20,}}>
                <View style={style.inputContainer}>
                    <Icon name="search" size={28} />
                    <TextInput style={{flex: 1, fontSize: 18}} placeholder="Search for food"/>
                </View>
                <TouchableOpacity style={style.sortBtn} onPress={some}>
                    <Icon name="tune" size={28} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            <View>
                <ListCategories/>
            </View>
            <ScrollView >
              <Card style={{backgroundColor:'purple'}}/>
            </ScrollView>
            
            
            
            
        </SafeAreaView>
      )

}

const style = StyleSheet.create({
    header: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      // backgroundColor:COLORS.primary
    },
    inputContainer: {
      flex: 1,
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      backgroundColor: COLORS.light,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    sortBtn: {
      width: 50,
      height: 50,
      marginLeft: 10,
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoriesListContainer: {
      paddingVertical: 30,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    categoryBtn: {
      height: 45,
      width: 120,
      marginRight: 7,
      borderRadius: 30,
      alignItems: 'center',
      paddingHorizontal: 5,
      flexDirection: 'row',
    },
    categoryBtnImgCon: {
      height: 35,
      width: 35,
      backgroundColor: COLORS.dark,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      height: 220,
      width: '150px',
      marginHorizontal: 10,
      marginBottom: 20,
      marginTop: 50,
      borderRadius: 15,
      elevation: 13,
      backgroundColor: COLORS.dark,//come back
    },
    cardScroll:{
      flexDirection:'row',
    },
    addToCartBtn: {
      height: 30,
      width: 30,
      borderRadius: 20,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadowProp: {  
      shadowOffset: {width: -2, height: 4},  
      shadowColor: COLORS.grey,  
      shadowOpacity: 0.5,  
      shadowRadius: 3,  
    },  
  });
  
  export default HomeScreen;
  