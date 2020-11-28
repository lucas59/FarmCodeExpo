import { StyleSheet } from 'react-native';

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
    color: 'white'
  },
  itemInfo: {
    paddingVertical: 2,
    display: 'flex',
    color: 'gray'
  },
  footer: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: 'lightgray'
  },
  kitContainer: {
    marginLeft: 20, marginVertical: 20, width: "90%"
  },
  kitTitleProduc: {
    color: 'gray',
    textAlign:'center',
    fontSize: 20
  }
});

export { styles };
