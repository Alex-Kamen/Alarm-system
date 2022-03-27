import Vue from 'vue';
import Vuetify from "vuetify";
import CrossIcon from "../components/icons/CrossIcon";
import PlusIcon from "../components/icons/PlusIcon";
import FootSensorIcon from "../components/icons/sensors/GuardSensors/FootSensorIcon";
import ManualSensorIcon from "../components/icons/sensors/GuardSensors/ManualSensorIcon";
import ActiveSingleBlockSensorIcon
  from "../components/icons/sensors/OpticalElectronicSensors/ActiveSingleBlockSensorIcon";
import ActiveTwoBlockSensorIcon from "../components/icons/sensors/OpticalElectronicSensors/ActiveTwoBlockSensorIcon";
import InfraredLinearSensorBlock from "../components/icons/sensors/OpticalElectronicSensors/InfraredLinearSensorBlock";
import InfraredSurfaceSensorIcon from "../components/icons/sensors/OpticalElectronicSensors/InfraredSurfaceSensorIcon";
import InfraredVolumetricSensorIcon
  from "../components/icons/sensors/OpticalElectronicSensors/InfraredVolumetricSensorIcon";
import SingleBlockSensorIcon from "../components/icons/sensors/RadioWaveSensors/SingleBlockSensorIcon";
import TwoBlockSensorIcon from "../components/icons/sensors/RadioWaveSensors/TwoBlockSensorIcon";
import AcousticSensorIcon from "../components/icons/sensors/AcousticSensorIcon";
import CombinedSensorIcon from "../components/icons/sensors/CombinedSensorIcon";
import ElectricalContactSensorIcon from "../components/icons/sensors/ElectricalContactSensorIcon";
import ItinerarySensorIcon from "../components/icons/sensors/ItinerarySensorIcon";
import PiezoelectricSensorIcon from "../components/icons/sensors/PiezoelectricSensorIcon";
import Column from "../components/icons/buildings/Column";
import DoubleDoor from "../components/icons/buildings/DoubleDoor";
import DoubleWindow from "../components/icons/buildings/DoubleWindow";
import SingleDoor from "../components/icons/buildings/SingleDoor";
import SingleWindow from "../components/icons/buildings/SingleWindow";
import Wall from "../components/icons/buildings/Wall";
import UPK from "../components/icons/sensors/UPK";
import BurgerMenuIcon from "../components/icons/BurgerMenuIcon";
import InfoIcon from "../components/icons/InfoIcon";

Vue.use(Vuetify);

export default (ctx) => {
  const vuetify = new Vuetify({
    icons: {
      values: {
        CrossIcon: {
          component: CrossIcon,
        },
        PlusIcon: {
          component: PlusIcon,
        },
        FootSensorIcon: {
          component: FootSensorIcon
        },
        ManualSensorIcon: {
          component: ManualSensorIcon
        },
        ActiveSingleBlockSensorIcon: {
          component: ActiveSingleBlockSensorIcon
        },
        ActiveTwoBlockSensorIcon: {
          component: ActiveTwoBlockSensorIcon
        },
        InfraredLinearSensorBlock: {
          component: InfraredLinearSensorBlock
        },
        InfraredSurfaceSensorIcon: {
          component: InfraredSurfaceSensorIcon
        },
        InfraredVolumetricSensorIcon: {
          component: InfraredVolumetricSensorIcon
        },
        SingleBlockSensorIcon: {
          component: SingleBlockSensorIcon
        },
        TwoBlockSensorIcon: {
          component: TwoBlockSensorIcon
        },
        AcousticSensorIcon: {
          component: AcousticSensorIcon
        },
        CombinedSensorIcon: {
          component: CombinedSensorIcon
        },
        ElectricalContactSensorIcon: {
          component: ElectricalContactSensorIcon
        },
        ItinerarySensorIcon: {
          component: ItinerarySensorIcon
        },
        PiezoelectricSensorIcon: {
          component: PiezoelectricSensorIcon
        },
        Column: {
          component: Column
        },
        DoubleDoor: {
          component: DoubleDoor
        },
        DoubleWindow: {
          component: DoubleWindow
        },
        SingleDoor: {
          component: SingleDoor
        },
        SingleWindow: {
          component: SingleWindow
        },
        Wall: {
          component: Wall
        },
        UPK: {
          component: UPK
        },
        BurgerMenu: {
          component: BurgerMenuIcon
        },
        InfoIcon: {
          component: InfoIcon
        }
      },
    },
  })

  ctx.app.vuetify = vuetify;
  ctx.$vuetify = vuetify.framework;
}
