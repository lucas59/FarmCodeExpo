import React from 'react';
import { BackHandler, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import { notifyConditionsFail } from '../../Utils/UtilsSession';

export default function OverlayTermsAndConditions(props) {
  const width = Dimensions.get('window').width;
  const heigth = Dimensions.get('window').height;

  const closeApp = () => {
    if ((Platform.OS = 'android')) {
      notifyConditionsFail().then(() => {
        BackHandler.exitApp();
      });
    }
  };

  return (
    <Overlay
      visible={props.visible}
      overlayStyle={{ width: width - 20, height: heigth - 80 }}
      onBackdropPress={props.handleOverlay}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Icon name="text-document" color={'#6aa6ff'} size={60} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Términos y Condiciones</Text>
            <Text style={styles.subtitle}>Actualizado 10 Junio, 2021</Text>
          </View>
        </View>
        <ScrollView indicatorStyle="black" style={styles.body}>
          <Text accessible={true} style={styles.conditions}>
            <Text style={{ fontSize: 20 }}> Aplicación “Etiqueta Virtual (EA)”</Text>
            {/* ----------------------------------------*/}
            {'\n'}
            {'\n'}1. Antecedentes
            {'\n'}1.1. “GS1 Uruguay” (Asociación Civil EAN Uruguay), es una Asociación Civil sin fines de lucro
            constituida bajo las leyes de la República Oriental del Uruguay con domicilio en la ciudad de Montevideo.
            {'\n'}1.2. Es la única titular de los derechos de propiedad intelectual e industrial sobre el sitio web
            https://gs1uy.org y el nombre de dominio “gs1uy.org”. Asimismo, cuenta con las licencias necesarias para
            hacer disponibles a los usuarios y permitir el uso de la aplicación “Etiqueta Virtual (EV)” y las marcas
            y logotipos que lucen en ellas.
            {'\n'}1.3. “Etiqueta Virtual (EV)” (“La Aplicación”) es una aplicación exclusivamente orientada a
            dispositivos (sistemas operativos Android e IOS), que se descarga gratuitamente desde Google Play o Apple
            Store, la cual permite a un usuario consultar información sobre un producto, leyendo su código de barras.
            {'\n'}
            {'\n'}2. Objeto
            {'\n'}2.1. La utilización de “Etiqueta Virtual (EV)” implica el íntegro conocimiento y aceptación de
            estos “Términos y Condiciones de Uso”. Cualquier modificación tendrá validez desde la debida notificación
            según lo establecido en este documento.
            {'\n'}2.2. Los “Términos y Condiciones de Uso” tienen carácter obligatorio y vinculante. Toda persona que
            no esté de acuerdo con ellos deberá abstenerse de utilizar la Aplicación.
            {'\n'}2.3. En cualquier momento pueden ser incluidas nuevas herramientas o funcionalidades, así como
            excluidas las ya existentes, sin necesidad de previo aviso al usuario.
            {'\n'}2.4. Toda nueva herramienta o funcionalidad incluida en la Aplicación estará automáticamente
            vinculada y subordinada a estos “Términos y Condiciones de Uso”. 2.5. La Aplicación estará disponible
            solamente a usuarios personas físicas con plena capacidad para contratar.
            {'\n'}
            {'\n'}3. Definiciones{'\n'}A los efectos de estos Términos y Condiciones, los siguientes términos y
            expresiones tendrán los siguientes significados:
            {'\n'}3.1. “GS1 Uruguay” es una organización que ofrece un sistema de estándares de identificación y
            comunicaciones globales, que permite a las empresas identificar, capturar y compartir información en
            forma segura y eficiente, obteniendo un resultado operativo eficiente, de modo de contribuir a generar
            más valor en todos los niveles de la cadena, apoyando así las buenas prácticas de la logística al
            minimizar los tiempos y costos.
            {'\n'}3.2. “Términos y Condiciones de Uso” hace mención a este documento, en el cual se indican los
            derechos y responsabilidades de los usuarios de la Aplicación.
            {'\n'}3.3. “Usuario” indica la persona física que utiliza la Aplicación, asumiendo los derechos y
            responsabilidades que dicho uso implican.
            {'\n'}3.4. “Etiqueta Virtual (EV)” es una aplicación diseñda para funcionar en dispositivos móviles, con
            sistemas operativos Android o IOS, que se puede descargar desde Google Play o de la Appstore de Apple. La
            aplicación, permite utilizar la cámara del dispositivo móvil para leer el código de barras que identifica
            los productos y devolver la información que la empresa proveedora de los mismos haya cargado en el
            catálogo Rondanet. La información de los productos se mostrará en la pantalla y podrá ser reproducida en
            forma oral utilizando la funcionalidad “Texto a Voz”, incorporada como herramienta de accesibilidad en
            cada dispositivo.
            {'\n'}3.5. “Código de Barras es el símbolo que representa al código GTIN que identifica a los productos y
            que está formado por una secuencia de barras de difrente grosor, generalmente de color oscuro sobre fondo
            claro. Se le llama GTIN (Global Trade Item Number) al número que identifica de forma única, global y no
            ambigua a todos los productos registrados bajo el estándar GS1. Cada GTIN diferente tiene asociado un
            código de barras distinto, el que es leído por la aplicación EV para acceder al catálogo Rondanet y
            extraer la información correspondiente.
            {'\n'}3.6. “Catálogo electrónico Rondanet” es un conjunto de bases de datos, en las que las empresas
            proveedoras (fabricantes/importadores) de los productos, cargan los atributos de los mimos, utilizando
            las herramientas proporcionadas por GS1 Uruguay. La información de los productos está compuesta por una
            serie de atributos, previamente definidos según el tipo de producto como GTIN, marca, descripción,
            contenido neto, composición, principio activo, etc. La información de cada producto contenida en el
            catálogo Rondanet es cargada y mantenida exclusivamente por la empresa proveedora. 3.7. Sistema “Texto a
            Voz” es una de las herramientas de accesibilidad que tienen incorporada los sistemas oprativos Android e
            IOS. Esta funcionalidad se encarga de describir en voz alta las acciones que se relizan en el
            dispositivo, así como las alertas y notificaciones que se aparecen en la pantalla. En el primer caso,
            esta herramienta se llama “Talk Back” y en el caso de IOS “VoiceOVer”.
            {'\n'}
            {'\n'}4. Utilización de la Aplicación
            {'\n'}4.1. Mediante la Aplicación “Etiqueta Virtual (EV)” el usuario podrá consultar la información de un
            producto, leyendo su código de barras. Para mostrarle al usuario la información de un producto, la
            aplicación EV accederá exclusivamente al catálogo de productos Rondanet. La información disponible para
            cada producto será la lista de atributos que el proveedor del mismo, haya ingresado previamente en el
            catálogo Rondanet. En caso de que la empresa proveedora de un producto no haya cargado la información
            correspondiente en el catálogo Rondanet, al leer el código de barras del producto, la aplicación no podrá
            devolver ningún atributo.
            {'\n'}4.2. “Etiqueta Virtual (EA)” no recoge datos personales de los usuarios de la aplicación. Sin
            perjuicio de ello, si fuere necesario recolectar y tratar datos personales de los usuarios, sólo se hará
            respecto a los datos de los usuarios que brinden su consentimiento, tratándose únicamente para la
            finalidad y con la modalidad prevista en este documento y en la Política de Privacidad.
            {'\n'}4.3. “Etiqueta Virtual (EA)” no cederá datos personales de los usuarios a terceros, reservándose la
            posibilidad de tratar la información recogida para ser utilizada en otros servicios y aplicaciones de la
            propia Asociación. Los datos podrán alojarse en servidores de la empresa o de terceros, los que contarán
            con las medidas de seguridad físicas y lógicas adecuadas, permitiéndose el acceso sólo a personal
            autorizado.
            {'\n'}4.4. Estas prácticas de la empresa en relación con sus servicios y aplicaciones podrán ser
            modificadas unilateralmente por “GS1 Uruguay”. Cualquier modificación relevante será notificada a los
            usuarios por medio de la Aplicación.
            {'\n'}
            {'\n'}5. Procedimiento
            {'\n'}5.1. El usuario de la Aplicación deberá manifestar electrónicamente su consentimiento expreso con
            los presentes “Términos y Condiciones de Uso” haciendo click en el botón “Acepto”, quedando así aceptadas
            todas las condiciones y términos aquí expresados.
            {'\n'}5.2. Sólo podrá utilizarse la Aplicación en nombre propio y para el cumplimiento de fines propios
            del usuario, no estando permitido la prestación de servicios a terceros ni la reventa de los mismos.
            {'\n'}5.3. “Etiqueta Virtual (EA)” no se responsabiliza por la certeza de los datos brindados a los
            usuarios. Solo pone en su conocimiento la información que previamente ha cargado la empresa proveedora en
            el Catálogo Rondanet. La empresa proveedora de los productos en el Catálogo Rondanet es la única
            responsable por la veracidad, exactitud y vigencia de la información cargada en la Aplicación y accesible
            para los usuarios.
            {'\n'}5.4. Está especialmente prohibido crear una cuenta a nombre de un tercero.
            {'\n'}5.5. El usuario se compromete a no permitir el acceso a terceros a través de su dispositivo.
            {'\n'}
            {'\n'}6. Propiedad intelectual y responsabilidad por la información
            {'\n'}6.1. Todo material encontrado en “Etiqueta Virtual (EA)” (textos, imágenes, audio, tecnología,
            logotipos, slogans, marcas, publicidad, nombres comerciales, dominios, obras intelectuales) y los
            softwares que hacen posible su funcionamiento, son de exclusiva propiedad de “GS1 Uruguay” o cuenta con
            los derechos suficientes para su utilización.
            {'\n'}6.2. Las obras referidas están protegidas por tratados internacionales de derecho de autor, marca,
            patente, modelos y diseños industriales. El uso indebido y la reproducción total o parcial de dichos
            contenidos quedan prohibidos, salvo autorización expresa y escrita de “GS1 Uruguay”.
            {'\n'}6.3. Cualquier violación por parte del usuario, implicará su responsabilidad directa y personal por
            los actos practicados, aparejando las responsabilidades civiles y penales pertinentes.
            {'\n'}6.4. El usuario se compromete a no reproducir, copiar el software utilizado o el material que deja
            disponible “Etiqueta Virtual (EA)” para cualquier fin no expresamente autorizado en el presente acuerdo,
            sin autorización por escrito.
            {'\n'}6.5. Queda especialmente prohibido al usuario, además de lo ya establecido en este documento, usar
            la Aplicación para fines diferentes a los que se encuentran específicamente autorizados.
            {'\n'}6.6. En cualquier caso, el usuario será el único responsable ante “GS1 Uruguay” y terceros por
            cualquier reclamo o indemnización a terceros, uso indebido o perjuicios relacionados al uso indebido de
            la Aplicación.
            {'\n'}
            {'\n'}7. Seguridad de la Información
            {'\n'}“GS1 Uruguay” toma resguardos para proteger la información ofrecida a sus usuarios, contando con
            medidas de seguridad electrónicas, físicas y de procedimientos para su protección.
            {'\n'}
            {'\n'}8. Responsabilidad de “GS1 Uruguay”
            {'\n'}8.1. “GS1 Uruguay” hará sus mejores esfuerzos para mantener la Aplicación accesible de forma
            constante, no interrumpida y exenta de cualquier error, pero no será responsable por daños ocasionados
            por las fallas que puede tener la Aplicación, ni por las interrupciones que puedan ocurrir en su
            funcionamiento.
            {'\n'}8.2. “GS1 Uruguay” ofrece la Aplicación con las prestaciones básicas según la presentación. La
            incorporación de cualquier modificación –aún las sugeridas por los clientes- será de exclusiva
            responsabilidad y decisión de “GS1 Uruguay”.
            {'\n'}8.3. En particular, el usuario reconoce y acepta que “GS1 Uruguay” no será responsable por:
            {'\n'}8.3.1. Imposibilidad de acceso a “Etiqueta Virtual (EV)” o falla en la comunicación con la
            Aplicación.
            {'\n'}8.3.2. Cualquier perjuicio causado por modificaciones hechas por el propio usuario o por un
            tercero.
            {'\n'}8.3.3. Cualquier perjuicio resultante o relacionado a cualquiera de las aplicaciones o trabajos
            presentados por los anunciantes o patrocinadores de “Etiqueta Virtual (EV)”, si hubiera.
            {'\n'}8.3.4. Cualquier perjuicio o daño al usuario por la utilización indebida o dolosa por terceros de
            los materiales o datos personales proporcionados por el mismo, que fueran ingresados a “Etiqueta
            Virtual(EV)”.
            {'\n'}8.3.5. Por actos de mala fe de terceros que promueve la intrusión de la Aplicación “Etiqueta
            Virtual (EV)”, tales como hackers que accedan a la información para cualquier fin. “GS1 Uruguay” declara
            tener cuidados razonables para evitar el acceso indebido a la Aplicación, pero no se hace responsable y
            no puede hacerse responsable por su inviolabilidad.
            {'\n'}8.3.6. Por inobservancia del usuario a las normas legales o del presente contrato, que genere
            perjuicios a terceros u otros usuarios.
            {'\n'}8.4. En caso de que uno o más usuarios o algún tercero inicien cualquier tipo de reclamo o acciones
            legales contra otro usuario, todos y cada uno de los usuarios involucrados en dichos reclamos o acciones,
            eximen de toda responsabilidad a “GS1 Uruguay” y a sus directores, gerentes, empleados, agentes,
            operarios, representantes y apoderados.
            {'\n'}8.5. El usuario mantendrá indemne a “GS1 Uruguay” de cualquier daño, perjuicio, contingencia o
            consecuencia negativa de cualquier especie que sobrevenga por la utilización proveniente de la
            Aplicación. Por lo cual, el usuario renuncia a realizar cualquier acción judicial o extrajudicial contra
            “GS1 Uruguay” que tenga como fundamento la utilización de la Aplicación.
            {'\n'}8.6. “GS1 Uruguay” no se responsabiliza de manera alguna por las decisiones personales,
            comerciales, empresariales, laborales o de cualquier otra índole que pueda tomar el usuario en base a la
            información que proporciona la Aplicación.
            {'\n'}8.7. “GS1 Uruguay” podrá suspender momentáneamente el acceso a la Aplicación para actualizar o
            realizar mantenimiento sobre la Aplicación, realizando sus mejores esfuerzos para que las suspensiones
            alteren al mínimo su funcionamiento.
            {'\n'}
            {'\n'}9. Plazo del contrato, rescisión y modificación
            {'\n'}9.1. La aceptación de estos “Términos y Condiciones de Uso” suponen la celebración de un contrato
            entre las partes, el cual estará válido y vigente mientras el usuario mantenga la Aplicación en uso.
            {'\n'}9.2. “GS1 Uruguay” se reserva el derecho de suspender el uso de la Aplicación o bloquear el acceso
            a la misma, según su exclusivo criterio.
            {'\n'}
            {'\n'}10. Condiciones generales
            {'\n'}10.1. “GS1 Uruguay” no se hace responsable del contenido, ni políticas y prácticas de privacidad de
            los sitios que hacen publicidad u ofertan en “Etiqueta Virtual (EV)” y aquellos en los cuales “Etiqueta
            Virtual (EV)” aparece.
            {'\n'}10.2. “Etiqueta Virtual (EA)” mantiene a disposición del usuario un canal para aclarar sus dudas,
            sugerencias y reclamos a través de info@gs1uy.org
            {'\n'}11. Jurisdicción y ley aplicable
            {'\n'}Este acuerdo estará regido y se interpretará en todos sus términos por las leyes vigentes de la
            República Oriental del Uruguay y el usuario acepta someterse a la jurisdicción exclusiva de los
            tribunales de la ciudad de Montevideo.
            {/* ----------------------------------------*/}
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <Button
            style={{ minWidth: 170 }}
            buttonStyle={{ height: 50 }}
            titleStyle={{ fontWeight: 'bold' }}
            type="outline"
            title="Rechazar"
            onPress={() => closeApp()}
          />
          <Button
            style={{ minWidth: 150 }}
            buttonStyle={{ height: 50 }}
            titleStyle={{ fontWeight: 'bold' }}
            type="solid"
            title="Aceptar"
            onPress={props.onAcepted.bind(this)}
          />
        </View>
      </View>
    </Overlay>
  );
}

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
