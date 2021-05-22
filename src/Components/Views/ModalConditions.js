import React from 'react';
import { View, Text, Dimensions, StyleSheet, BackHandler } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import { notifyConditionsHidden } from '../../Utils/UtilsGenerals';

export default class ModalConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      heigth: Dimensions.get('window').height,
    };
  }
  static navigationOptions = {
    header: null,
  };

  goBack = () => {
    notifyConditionsHidden().then(() => {
      this.props.navigation.goBack();
    });
  };

  render() {
    const styles = StyleSheet.create({
      header: {
        fontSize: 24,
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#595959',
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#bfbfbf',
        textAlign: 'center',
      },
      body: {
        marginHorizontal: 20,
        marginVertical: 10,
        overflow: 'scroll',
      },
      conditions: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
      },
    });

    const { width } = this.state;
    return (
      <View
        style={{
          width: width - 20,
          marginTop: 10,
          marginRight: 'auto',
          marginLeft: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Icon name="text-document" color={'#6aa6ff'} size={60} />
            <View style={{ alignItems: 'flex-start' }}>
              <Text accessibility={true} style={styles.title}>
                Términos y Condiciones
              </Text>
              <Text style={styles.subtitle}>Actualizado 10 Noviembre, 2020</Text>
            </View>
          </View>
          <ScrollView indicatorStyle="black" style={styles.body}>
            <Text accessibility={true} style={styles.conditions}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit quae quo asperiores earum corrupti
              excepturi consectetur neque harum eligendi ratione at dolorem accusamus dolor, illo nobis et eveniet
              nulla quod? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, doloribus nesciunt. Est
              minus nobis non, cumque iste numquam fugiat et dignissimos debitis similique dolore ad reiciendis
              beatae assumenda fuga! In. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error atque,
              corrupti praesentium repudiandae aspernatur assumenda sit? Ipsa minima excepturi et vero tempore,
              dolores tempora sed magni nobis eius, dolor reprehenderit! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Error culpa voluptatum eius, earum cumque beatae doloremque repudiandae excepturi,
              necessitatibus aut explicabo? Doloremque eius accusamus nihil pariatur nisi eos, saepe id.
            </Text>
          </ScrollView>
          <View style={styles.footer}>
            <Button
              onPress={() => this.goBack()}
              buttonStyle={{ height: 50, minWidth: 250 }}
              titleStyle={{ fontWeight: 'bold' }}
              type="solid"
              title="Listo"
            />
          </View>
        </View>
      </View>
    );
  }
}
