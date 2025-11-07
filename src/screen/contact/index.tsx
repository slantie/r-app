import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Text, Platform, Alert, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { ContactStyles } from './styles';
import {
  Container,
  HeaderComponent,
  SearchInput,
} from '../../components/common';
import Contacts from 'react-native-contacts';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import { commonImageAction } from '../../store/actions/commonImage/imageAction';
import { contactUploadAction } from '../../store/actions/contacts/contactUploadAction';
import { getContactListAction } from '../../store/actions/contacts/getContactListAction';
import { inviteContactListAction } from '../../store/actions/contacts/inviteContactListAction';
import { myContactListAction } from '../../store/actions/contacts/myContactListAction';
import { Initials } from '../../utils/method';
import { addContactAction } from '../../store/actions/contacts/addContactAction';
import { COLORS, FF, FS, LH } from '../../constants';

let permissionGranted: any;



const Contact = (props: any) => {
  const dispatch = useDispatch() as any;
  const { userData } = useSelector((state: any) => state.otp);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  // Static display data
  const staticFirstName = 'John';
  const staticLastName = 'Doe';
  const staticDisplayName = 'John Doe';
  const staticPhoneNumber = userData?.phoneNumber || '9988776655';
  const staticCountryCode = userData?.countryCode || '+91';

  // API dispatch functions
  const contactUploadApi = (req: any) => dispatch(commonImageAction(req));
  const contactFileUploadAction = (req: any) => dispatch(contactUploadAction(req));
  const getContactListAPI = (req: any) => dispatch(getContactListAction(req));
  const inviteContactListAPI = (req: any) => dispatch(inviteContactListAction(req));
  const myContactListAPI = (req: any) => dispatch(myContactListAction(req));
  const AddConatctApi = (req: any) => dispatch(addContactAction(req));

  // Contact lists state
  const [myContactList, setMyContactList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // API call with pagination support - only mycontactsApiCall
  const mycontactsApiCall = (page: number = 1, loadMore: boolean = false) => {
    return myContactListAPI({ page }).then((res: any) => {
      console.log('mycontactsApiCall res', res);
      const users = res?.data?.result?.users || [];
      if (loadMore) {
        setMyContactList(prev => [...prev, ...users]);
      } else {
        setMyContactList(users);
      }
      return { users, hasMore: users.length >= 10 };
    }).catch((error: any) => {
      console.error('Error fetching my contacts:', error);
      return { users: [], hasMore: false };
    });
  };

  // const requestContactsPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //       {
  //         title: 'Contacts Permission',
  //         message: 'This app would like to view your contacts.',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   }
  //   return true;
  // };

  // useEffect(() => {
  //   // console.log('useEffect called');

  //   const loadContacts = async () => {
  //     const permission = await requestContactsPermission();
  //     console.log('permission', permission);

  //     permissionGranted = permission;

  //     if (permission) {
  //       Contacts.getAll()
  //         .then((contacts: any) => {
  //           setContacts(contacts);
  //           console.log('Synced Contacts:', contacts);
  //           saveArrayToFile()
  //         })
  //         .catch(error => {
  //           console.warn('Error fetching contacts:', error);
  //         });
  //     }
  //   };
  //   loadContacts();
  // }, [permissionGranted]);

  // Load contact data when component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setCurrentPage(1);
      setHasMore(true);

      await mycontactsApiCall(1, false);

      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Load more contacts function
  const loadMoreContacts = async () => {
    if (hasMore && !isLoadingMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setIsLoadingMore(true);

      const result = await mycontactsApiCall(nextPage, true);

      setHasMore(result.hasMore);

      setIsLoadingMore(false);
    }
  };

  // const transformContacts = (contacts: any[]) => {
  //   return contacts.reduce((acc: any[], contact) => {
  //     const phoneObj = contact.phoneNumbers && contact.phoneNumbers[0];
  //     let countryCode = '';
  //     let phoneNumber = '';

  //     if (phoneObj && phoneObj.number) {
  //       // Clean: remove hyphens, spaces, tabs, and any other non-digit characters except +
  //       let cleaned = phoneObj.number.replace(/[^\d+]/g, '').trim();

  //       // If starts with + → extract country code and number
  //       if (cleaned.startsWith('+')) {
  //         const match = cleaned.match(/^(\+\d{1,3})(\d{7,})$/);
  //         if (match) {
  //           countryCode = match[1];
  //           phoneNumber = match[2];
  //         } else {
  //           // fallback: assume +91 if match fails
  //           countryCode = '+91';
  //           phoneNumber = cleaned.replace(/^\+\d{1,3}/, '');
  //         }
  //       } else {
  //         // For numbers without +, assume they are Indian numbers
  //         phoneNumber = cleaned;
  //         countryCode = '+91';
  //       }

  //       // Accept only numbers with at least 7 digits (minimum for valid phone numbers)
  //       if (phoneNumber && phoneNumber.length >= 7) {
  //         acc.push({
  //           firstName: contact.givenName || '',
  //           lastName: contact.familyName || '',
  //           countryCode,
  //           phoneNumber,
  //         });
  //       }
  //     }

  //     return acc;
  //   }, []);
  // };

  // const fileUploadApi = async (path: any) => {
  //   const data = {
  //     uri: `file://${path}`,
  //     type: 'application/json',
  //     name: 'contacts.json',
  //   };

  //   const imageFormData = new FormData();
  //   imageFormData.append('upload_file', data);
  //   imageFormData.append('root', 'users');
  //   imageFormData.append('type', 'contacts');

  //   console.log('formData', data);

  //   const imageUploadResponse = await contactUploadApi(imageFormData);
  //   console.log('imageUploadResponse', imageUploadResponse);

  //   if (imageUploadResponse && imageUploadResponse.status === 200) {
  //     contactFileUpload(imageUploadResponse?.data?.result?.fileName);
  //   } else {
  //     // Alert.alert('Error', 'Failed to upload contacts file');
  //   }
  // }

  // const contactFileUpload = async (path: any) => {
  //   const data = {
  //     contactFileName: path,
  //   };
  //   console.log('data', data);

  //   const contactUploadResponse = await contactFileUploadAction(data);
  //   if (contactUploadResponse && contactUploadResponse.status === 200) {
  //     console.log('contactUploadResponse', contactUploadResponse);
  //     // Refresh contact list after successful upload
  //     setLoading(true);
  //     setCurrentPage(1);
  //     setHasMore(true);

  //     await mycontactsApiCall(1, false);

  //     setLoading(false);
  //   } else {
  //     Alert.alert('Error', 'Failed to upload contacts file');
  //   }
  // }

  // const saveArrayToFile = async () => {
  //   try {
  //     const transformed = transformContacts(contacts);
  //     // console.log('transformed', contacts);
  //     // console.log('transformed', transformed);

  //     const path = `${RNFS.DocumentDirectoryPath}/contacts.json`;
  //     const fileContent = JSON.stringify(transformed, null, 2);
  //     await RNFS.writeFile(path, fileContent, 'utf8');

  //     if (transformed.length > 0) {
  //       fileUploadApi(path);
  //     }

  //   } catch (error) {
  //     console.error('File upload error:', error);
  //     Alert.alert('Error', 'Failed to save or upload file');
  //   }
  // };

  return (
    <Container>
      <View style={ContactStyles.container}>
        <HeaderComponent
          Title="Network"
          onPress={() => props.navigation.goBack()}
        />
        <View style={ContactStyles.searchContainer}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Search" />
        </View>
        {/* userCard */}
        <View style={{ paddingVertical: 12,flexDirection:'row',alignItems:'center',borderBottomWidth:0.3,borderBottomColor:COLORS.BORDER_GREY,paddingBottom:20 }}>
          <View style={{ width: 70, height: 70, borderWidth: 0.3, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.BORDER_GREY }}>
            <Text style={{ fontSize: FS.FS24, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }}>{Initials(staticFirstName + " " + staticLastName)}</Text>
          </View>
          <View style={{ marginLeft: 12,flex:1 }}>
            <Text style={{ fontSize: FS.FS18, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }}>{staticDisplayName}</Text>
            <Text style={{ fontSize: FS.FS14, color: COLORS.BLACK, fontFamily: FF[400] ,marginTop:8}}>{staticCountryCode + " " + staticPhoneNumber}</Text>
          </View>
        </View>

       <View style={{flex: 1}}>

       {loading?<View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:100}}><ActivityIndicator size="small" color={COLORS.BLUE_TEXT} /></View> : <FlatList
          data={myContactList}
          keyExtractor={(item: any, index: number) => item._id || index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 200}}
          nestedScrollEnabled={true}
          onEndReached={() => {
            if (hasMore && !isLoadingMore && !loading) {
              loadMoreContacts();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            isLoadingMore ? (
              <View style={{paddingVertical: 20, alignItems: 'center'}}>
                <ActivityIndicator size="small" color={COLORS.BLUE_TEXT} />
              </View>
            ) : null
          )}
          ListEmptyComponent={() => (
            !loading ? (
              <View style={{marginTop:24, alignItems: 'center', padding: 20}}>
                <Text style={{ fontSize: FS.FS16, color: COLORS.GREY_TEXT, fontFamily: FF[400], textAlign: 'center' }}>
                  No contacts found. Pull down to refresh or check your connection.
                </Text>
              </View>
            ) : null
          )}
          renderItem={({ item }: any) => (
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{height:42,width:42,borderWidth:0.3,borderRadius:100,justifyContent:'center',alignItems:'center',borderColor:COLORS.BORDER_GREY}}>
                <Text style={{ fontSize: FS.FS16, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }}>
                  {Initials(item?.firstName + " " + item?.lastName)}
                </Text>
              </View>
              <View style={{flex:1,marginLeft:12,borderBottomWidth:0.3,borderBottomColor:COLORS.BORDER_GREY,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:16}}>
                <Text style={{ fontSize: FS.FS16, color: COLORS.BLACK_TEXT, fontFamily: FF[500]}}>
                  {item?.firstName + " " + item?.lastName}
                </Text>
              </View>
            </View>
          )}
        />}
       </View>
      </View>
    </Container>
  );
};

export default Contact;


// import React, { useEffect, useState } from 'react';
// import { View, PermissionsAndroid, Text, Platform, Alert, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
// import { ContactStyles } from './styles';
// import {
//   Container,
//   HeaderComponent,
//   SearchInput,
// } from '../../components/common';
// import Contacts from 'react-native-contacts';
// import RNFS from 'react-native-fs';
// import { useDispatch, useSelector } from 'react-redux';
// import { commonImageAction } from '../../store/actions/commonImage/imageAction';
// import { contactUploadAction } from '../../store/actions/contacts/contactUploadAction';
// import { getContactListAction } from '../../store/actions/contacts/getContactListAction';
// import { inviteContactListAction } from '../../store/actions/contacts/inviteContactListAction';
// import { myContactListAction } from '../../store/actions/contacts/myContactListAction';
// import { Initials } from '../../utils/method';
// import { addContactAction } from '../../store/actions/contacts/addContactAction';
// import { COLORS, FF, FS, LH } from '../../constants';

// let permissionGranted: any;



// const Contact = (props: any) => {
//   const dispatch = useDispatch() as any;
//   const { userData } = useSelector((state: any) => state.otp);
//   const [contacts, setContacts] = useState([]);
//   const [search, setSearch] = useState('');

//   // API dispatch functions
//   const contactUploadApi = (req: any) => dispatch(commonImageAction(req));
//   const contactFileUploadAction = (req: any) => dispatch(contactUploadAction(req));
//   const getContactListAPI = (req: any) => dispatch(getContactListAction(req));
//   const inviteContactListAPI = (req: any) => dispatch(inviteContactListAction(req));
//   const myContactListAPI = (req: any) => dispatch(myContactListAction(req));
//   const AddConatctApi = (req: any) => dispatch(addContactAction(req));

//   // Contact lists state
//   const [getContactList, setGetContactList] = useState<any[]>([]);
//   const [inviteContactList, setInviteContactList] = useState<any[]>([]);
//   const [myContactList, setMyContactList] = useState<any[]>([]);
// const [loading, setLoading] = useState<boolean>(false);




//   // Simple API calls without pagination
//   const getContactListAPICall = () => {
//     getContactListAPI({ page: 1 }).then((res: any) => {
//       console.log('getContactListAPICall res', res);
//       setGetContactList(res?.data?.result?.users || []);
//     }).catch((error: any) => {
//       console.error('Error fetching registered contacts:', error);
//     });
//   };

//   const inviteContactListAPICall = () => {
//     inviteContactListAPI({ page: 1 }).then((res: any) => {
//       console.log('inviteContactListAPICall res', res);
//       setInviteContactList(res?.data?.result?.users || []);
//     }).catch((error: any) => {
//       console.error('Error fetching invite contacts:', error);
//     });
//   };

//   const mycontactsApiCall = () => {
//     setLoading(true);
//     myContactListAPI({ page: 1 }).then((res: any) => {
//       console.log('mycontactsApiCall res', res);
//       setMyContactList(res?.data?.result?.users || []);
//       setLoading(false);
//     }).catch((error: any) => {
//       console.error('Error fetching my contacts:', error);
//       setLoading(false);
//     });
//   };





//   const requestContactsPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//         {
//           title: 'Contacts Permission',
//           message: 'This app would like to view your contacts.',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   useEffect(() => {
//     // console.log('useEffect called');

//     const loadContacts = async () => {
//       const permission = await requestContactsPermission();
//       console.log('permission', permission);

//       permissionGranted = permission;

//       if (permission) {
//         Contacts.getAll()
//           .then((contacts: any) => {
//             setContacts(contacts);
//             console.log('Synced Contacts:', contacts);
//             saveArrayToFile()
//           })
//           .catch(error => {
//             console.warn('Error fetching contacts:', error);
//           });
//       }
//     };
//     loadContacts();
//   }, [permissionGranted]);

//   // Load contact data when component mounts
//   useEffect(() => {
//     getContactListAPICall();
//     inviteContactListAPICall();
//     mycontactsApiCall();
//   }, []);

//   const transformContacts = (contacts: any[]) => {
//     return contacts.reduce((acc: any[], contact) => {
//       const phoneObj = contact.phoneNumbers && contact.phoneNumbers[0];
//       let countryCode = '';
//       let phoneNumber = '';

//       if (phoneObj && phoneObj.number) {
//         // Clean: remove hyphens, spaces, tabs, and any other non-digit characters except +
//         let cleaned = phoneObj.number.replace(/[^\d+]/g, '').trim();

//         // If starts with + → extract country code and number
//         if (cleaned.startsWith('+')) {
//           const match = cleaned.match(/^(\+\d{1,3})(\d{7,})$/);
//           if (match) {
//             countryCode = match[1];
//             phoneNumber = match[2];
//           } else {
//             // fallback: assume +91 if match fails
//             countryCode = '+91';
//             phoneNumber = cleaned.replace(/^\+\d{1,3}/, '');
//           }
//         } else {
//           // For numbers without +, assume they are Indian numbers
//           phoneNumber = cleaned;
//           countryCode = '+91';
//         }

//         // Accept only numbers with at least 7 digits (minimum for valid phone numbers)
//         if (phoneNumber && phoneNumber.length >= 7) {
//           acc.push({
//             firstName: contact.givenName || '',
//             lastName: contact.familyName || '',
//             countryCode,
//             phoneNumber,
//           });
//         }
//       }

//       return acc;
//     }, []);
//   };

//   const fileUploadApi = async (path: any) => {
//     const data = {
//       uri: `file://${path}`,
//       type: 'application/json',
//       name: 'contacts.json',
//     };

//     const imageFormData = new FormData();
//     imageFormData.append('upload_file', data);
//     imageFormData.append('root', 'users');
//     imageFormData.append('type', 'contacts');

//     console.log('formData', data);

//     const imageUploadResponse = await contactUploadApi(imageFormData);
//     console.log('imageUploadResponse', imageUploadResponse);

//     if (imageUploadResponse && imageUploadResponse.status === 200) {
//       contactFileUpload(imageUploadResponse?.data?.result?.fileName);
//     } else {
//       // Alert.alert('Error', 'Failed to upload contacts file');
//     }
//   }

//   const contactFileUpload = async (path: any) => {
//     const data = {
//       contactFileName: path,
//     };
//     console.log('data', data);

//     const contactUploadResponse = await contactFileUploadAction(data);
//     if (contactUploadResponse && contactUploadResponse.status === 200) {
//       console.log('contactUploadResponse', contactUploadResponse);
//       // Refresh all contact lists after successful upload
//       await getContactListAPICall();
//       await inviteContactListAPICall();
//       await mycontactsApiCall();
//     } else {
//       Alert.alert('Error', 'Failed to upload contacts file');
//     }
//   }

//   const saveArrayToFile = async () => {
//     try {
//       const transformed = transformContacts(contacts);
//       // console.log('transformed', contacts);
//       // console.log('transformed', transformed);

//       const path = `${RNFS.DocumentDirectoryPath}/contacts.json`;
//       const fileContent = JSON.stringify(transformed, null, 2);
//       await RNFS.writeFile(path, fileContent, 'utf8');

//       if (transformed.length > 0) {
//         fileUploadApi(path);
//       }

//     } catch (error) {
//       console.error('File upload error:', error);
//       Alert.alert('Error', 'Failed to save or upload file');
//     }
//   };

//   const AddContactApiCall = async (id: any) => {
//     try {
//       let payload = {
//         userId: id
//       }

//       console.log('Adding contact with payload:', payload);

//       const res = await AddConatctApi(payload);
//       console.log('Add contact response:', res);

//       if (res && res.status === 200) {
//         // Show success message
//         Alert.alert('Success', 'Contact added successfully!');

//         // Refresh both lists to show updated data
//         await mycontactsApiCall();
//         await getContactListAPICall();
//       } else {
//         Alert.alert('Error', 'Failed to add contact. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error adding contact:', error);
//       Alert.alert('Error', 'Failed to add contact. Please try again.');
//     }
//   }



//   // Render section header
//   const renderSectionHeader = (type: string) => {
//     const title = type === 'registered' ? 'Saved Contacts' : type === 'invite' ? 'Contacts' : 'My Contacts';
//     const count = type === 'registered' ? getContactList.length : type === 'invite' ? inviteContactList.length : myContactList.filter((item: any) => !item?.isSynced && item?.isProfileSubmit).length;

//     return (
//       <View style={{marginTop:24}}>
//         <Text style={{ fontSize: FS.FS16, color: COLORS.GREY_TEXT, fontFamily: FF[400],lineHeight:LH.LH20,letterSpacing:1 }}>
//           {title}  ({count})
//         </Text>
//       </View>
//     );
//   };


//   return (
//     <Container>
//       <View style={ContactStyles.container}>
//         <HeaderComponent
//           Title="Network"
//           onPress={() => props.navigation.goBack()}
//         />
//         <View style={ContactStyles.searchContainer}>
//           <SearchInput value={search} onChangeText={setSearch} placeholder="Search" />
//         </View>
//         {/* userCard */}
//         <View style={{ paddingVertical: 12,flexDirection:'row',alignItems:'center',borderBottomWidth:0.3,borderBottomColor:COLORS.BORDER_GREY,paddingBottom:20 }}>
//           <View style={{ width: 70, height: 70, borderWidth: 0.3, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.BORDER_GREY }}>
//             {userData.profileImage != "" ? <Image source={{ uri: userData.profilePath + userData.profileImage || '' }} style={{ width: 70, height: 70,borderRadius: 100, }} /> :
//               <Text style={{ fontSize: FS.FS24, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }}>{Initials(userData.firstName + " " + userData.lastName)}</Text>}
//           </View>
//           <View style={{ marginLeft: 12,flex:1 }}>
//             <Text style={{ fontSize: FS.FS18, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }}>{userData.firstName + " " + userData.lastName}</Text>
//             <Text style={{ fontSize: FS.FS14, color: COLORS.BLACK, fontFamily: FF[400] ,marginTop:8}}>{userData.countryCode + " " + userData.phoneNumber}</Text>
//           </View>
//         </View>

//        <View>

//        {loading?<View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:100}}><ActivityIndicator size="small" color={COLORS.BLUE_TEXT} /></View> : <ScrollView
//           // style={{flex: 1}}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{paddingBottom: 200}}
//           nestedScrollEnabled={true}
//         >
//          {/* Registered Contacts Section */}
//          {getContactList.length > 0 && renderSectionHeader('registered')}
//          {getContactList.length > 0 && (
//            <View style={{marginTop:12}}>
//              {getContactList.map((item: any, index: number) => (
//                <View key={item._id || index} style={{flexDirection:'row',alignItems:'center',}}>
//                  <View style={{height:42,width:42,borderWidth:0.3,borderRadius:100,justifyContent:'center',alignItems:'center',borderColor:COLORS.BORDER_GREY}}>
//                    <Text style={{ fontSize: FS.FS16, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }}>
//                      {Initials(item?.firstName + " " + item?.lastName)}
//                    </Text>
//                  </View>
//                  <View style={{flex:1,marginLeft:12,borderBottomWidth:0.3,borderBottomColor:COLORS.BORDER_GREY,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:16}}>
//                    <Text style={{ fontSize: FS.FS16, color: COLORS.BLACK_TEXT, fontFamily: FF[500]}}>
//                      {item?.firstName + " " + item?.lastName}
//                    </Text>

//                  </View>
//                </View>
//              ))}
//            </View>
//          )}

//          {/* My Contacts Section */}
//          {myContactList.filter((item: any) => !item?.isSynced && item?.isProfileSubmit).length > 0 && renderSectionHeader('my')}
//          {myContactList.filter((item: any) => !item?.isSynced && item?.isProfileSubmit).length > 0 && (
//            <View style={{marginTop:12}}>
//              {myContactList.filter((item: any) => !item?.isSynced && item?.isProfileSubmit).map((item: any, index: number) => (
//                <View key={item._id || index} style={{flexDirection:'row',alignItems:'center'}}>
//                  <View style={{height:42,width:42,borderWidth:0.3,borderRadius:100,justifyContent:'center',alignItems:'center',borderColor:COLORS.BORDER_GREY}}>
//                    <Text style={{ fontSize: FS.FS16, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }}>
//                      {Initials(item?.firstName + " " + item?.lastName)}
//                    </Text>
//                  </View>
//                  <View style={{flex:1,marginLeft:12,flexDirection:'row',alignItems:'center',borderBottomWidth:0.3,borderBottomColor:COLORS.BORDER_GREY,paddingVertical:10}}>
//                    <View style={{flex:0.6}}>
//                      <Text style={{ fontSize: FS.FS16, color: COLORS.BLACK_TEXT, fontFamily: FF[500]}}>
//                        {item?.firstName + " " + item?.lastName}
//                      </Text>
//                    </View>
//                    <TouchableOpacity
//                      style={{flex:0.4,paddingVertical:10,paddingHorizontal:5}}
//                      onPress={() => AddContactApiCall(item._id)}
//                    >
//                      <Text style={{ fontSize: FS.FS14, color: COLORS.BLUE_TEXT, fontFamily: FF[500],textAlign:'right'}}>
//                        Add
//                      </Text>
//                    </TouchableOpacity>
//                  </View>
//                </View>
//              ))}
//            </View>
//          )}

//          {/* Invite Contacts Section */}
//          {inviteContactList.length > 0 && renderSectionHeader('invite')}
//          {inviteContactList.length > 0 && (
//            <View style={{marginTop:12}}>
//              {inviteContactList.map((item: any, index: number) => (
//                <View key={item._id || index} style={{flexDirection:'row',alignItems:'center'}}>
//                  <View style={{height:42,width:42,borderWidth:0.3,borderRadius:100,justifyContent:'center',alignItems:'center',borderColor:COLORS.BORDER_GREY}}>
//                    <Text style={{ fontSize: FS.FS16, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }}>
//                      {Initials(item?.firstName + " " + item?.lastName)}
//                    </Text>
//                  </View>
//                  <View style={{flex:1,marginLeft:12,flexDirection:'row',alignItems:'center',borderBottomWidth:0.3,borderBottomColor:COLORS.BORDER_GREY,paddingVertical:10}}>
//                    <View style={{flex:0.7}}>
//                      <Text style={{ fontSize: FS.FS16, color: COLORS.BLACK_TEXT, fontFamily: FF[500]}}>
//                        {item?.firstName + " " + item?.lastName}
//                      </Text>
//                    </View>
//                    <TouchableOpacity
//                      style={{flex:0.3,paddingVertical:10,paddingHorizontal:5}}
//                      onPress={() => Alert.alert('Upcoming')}
//                    >
//                      <Text style={{ fontSize: FS.FS14, color: COLORS.BLUE_TEXT, fontFamily: FF[500],textAlign:'right'}}>
//                        Invite
//                      </Text>
//                    </TouchableOpacity>
//                  </View>
//                </View>
//              ))}
//            </View>
//          )}

//          {/* Show message when no contacts */}
//          {/* {getContactList.length === 0 && inviteContactList.length === 0 && myContactList.filter((item: any) => !item?.isSynced && item?.isProfileSubmit).length === 0 && (
//            <View style={{marginTop:24, alignItems: 'center', padding: 20}}>
//              <Text style={{ fontSize: FS.FS16, color: COLORS.GREY_TEXT, fontFamily: FF[400], textAlign: 'center' }}>
//                No contacts found. Pull down to refresh or check your connection.
//              </Text>
//            </View>
//          )} */}
//         </ScrollView>}
//        </View>
//       </View>
//     </Container>
//   );
// };

// export default Contact;


