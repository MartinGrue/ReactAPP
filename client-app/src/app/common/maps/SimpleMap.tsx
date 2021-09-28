import * as React from "react";
import { observer } from "mobx-react-lite";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker: React.FC<{ lat: any; lng: any }> = ({ lat, lng }) => (
  <Icon name="marker" size="big" color="red" />
);

interface IProps {
  lat: number;
  lng: number;
  opt: {};
}
export const SimpleMap: React.FC<IProps> = ({ lat, lng, opt }) => {
  const baseOpt = {
    defaultZoom: 14,
    bootstrapURLKeys: {
      key: "AIzaSyCHYvacLxG7odfjovNDb1GpTHon3BMIXlw",
    },
  };
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <GoogleMapReact
        center={{ lat, lng }}
        {...baseOpt}
        {...opt}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>

      {/* <GoogleMapReact {...baseOpt} {...defaultOpt} {...opt}>
            <Marker
              lat={defaultOpt.defaultCenter.lat}
              lng={defaultOpt.defaultCenter.lng}
            />
          </GoogleMapReact> */}
    </Segment>
  );
};
export default observer(SimpleMap);
