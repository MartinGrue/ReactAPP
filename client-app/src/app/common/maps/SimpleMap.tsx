import {PropsWithChildren} from "react";
import { observer } from "mobx-react-lite";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact, { Props } from "google-map-react";

const Marker: React.FC = () => <Icon name="marker" size="big" color="red" />;

interface IProps extends PropsWithChildren  {
  lat: number;
  lng: number;
  props: Props;
}
export const SimpleMap: React.FC<IProps> = ({ lat, lng, props }) => {
  const baseOpt = {
    defaultZoom: 14,
    bootstrapURLKeys: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
      libraries: "places",
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
