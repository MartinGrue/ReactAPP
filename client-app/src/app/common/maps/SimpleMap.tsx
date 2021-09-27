import * as React from "react";
import { observer } from "mobx-react-lite";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker: React.FC<{ lat: any; lng: any }> = ({ lat, lng }) => (
  <Icon name="marker" size="big" color="red" />
);

interface IProps {
  lat?: number;
  lng?: number;
  opt: {};
}
export const SimpleMap: React.FC<IProps> = ({ lat, lng, opt }) => {
  const baseOpt = {
    defaultZoom: 14,
    bootstrapURLKeys: {
      key: "AIzaSyCHYvacLxG7odfjovNDb1GpTHon3BMIXlw",
    },
  };
  const defaultOpt = {
    defaultCenter: { lat: 52.372513, lng: 9.732968 },
  };
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div>
        {lat && lng ? (
          <GoogleMapReact
            defaultCenter={{ lat: lat!, lng: lng! }}
            {...baseOpt}
            {...opt}
          >
            <Marker lat={lat} lng={lng} />
          </GoogleMapReact>
        ) : (
          <GoogleMapReact {...baseOpt} {...defaultOpt} {...opt}>
            <Marker
              lat={defaultOpt.defaultCenter.lat}
              lng={defaultOpt.defaultCenter.lng}
            />
          </GoogleMapReact>
        )}
      </div>
    </Segment>
  );
};
export default observer(SimpleMap);
