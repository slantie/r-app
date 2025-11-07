import { StyleSheet } from 'react-native';
import { COLORS, FF, LH } from '../../../constants';

const SearchInputStyles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    // borderWidth: 1,
    // borderColor: ,
    backgroundColor: '#7575751A',
    borderRadius: 8,
    paddingHorizontal:10
  },
  searchIcon: {
    width: 20,
    height: 20,
    // marginLeft: 10,
  },
  searchInput: {
    // paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderWidth:1,
    flex:1
    // lineHeight:LH.LH24,
    // borderWidth:1
  },
});

export default SearchInputStyles;
