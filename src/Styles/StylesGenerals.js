import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerStyle: {
    backgroundColor: '#0571c3',
    color:'white'
  },
  itemInfo: {
    paddingVertical: 2,
    display:'flex'
  },
  footer: {
    height: 100,
    flexDirection:'row',
    backgroundColor:'white',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth:1,
    borderTopColor:'lightgray'
  },
});

export {styles};
