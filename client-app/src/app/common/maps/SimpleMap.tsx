import * as React from "react";
import { observer } from "mobx-react-lite";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact, {Props} from "google-map-react";

const Marker: React.FC = () => <Icon name="marker" size="big" color="red" />;

interface IProps {
  lat: number;
  lng: number;
  props: Props;
}
export const SimpleMap: React.FC<IProps> = ({ lat, lng, props }) => {
  const baseOpt = {
    defaultZoom: 14,
    bootstrapURLKeys: {
      key: "AIzaSyCHYvacLxG7odfjovNDb1GpTHon3BMIXlw",
    },
  };
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <GoogleMapReact center={{ lat, lng }} {...baseOpt} {...props}>
        <Marker />
      </GoogleMapReact>
    </Segment>
  );
};
export default observer(SimpleMap);
