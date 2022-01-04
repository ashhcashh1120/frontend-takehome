import { useSubscription } from "@apollo/client";
import { GoogleMap, LoadScript, Circle, Marker } from "@react-google-maps/api";
import gql from "graphql-tag";


const containerStyle = {
  width: "800px",
  height: "600px",
};

const CARS_DESTINATION_UPDATE = gql`
  subscription {
    cars {
      id
      location {
        longitude
        latitude
      }
      distanceToDestination
      destination {
        latitude
        longitude
      }
    }
  }
`;

const CarMap = () => {
  // At the top of this component you should subscribe to updates from the server.
  // See https://www.apollographql.com/docs/react/data/subscriptions/#executing-a-subscription

  /**
   * 1. Setup a subscription  to listen for cars update
   * 2. Save update to state
   * 3. feed update to google map
   */



  const { loading, data } = useSubscription(CARS_DESTINATION_UPDATE);

  if (loading) {
    // setCars(data.cars);
    return <p>Data not available yet</p>;
  }
  console.log(data);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD3MVDG8SXth-Ztrztw1zCIL5oYbNDKxdI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 40.754932, lng: -73.9840162 }}
        zoom={11}
      >
        {/* For documentation on the MapView see https://react-google-maps-api-docs.netlify.app/ */}
        {data.cars.map((car: { location: any }, index: number | string) => {
          console.log('Single car', car)
          return (
            <Circle
              key={index}
              center={{ lat: car.location.latitude, lng: car.location.longitude }}
              radius={1500}
              options={{
                strokeColor: "#66009a",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: `#66009a`,
                fillOpacity: 0.35,
                zIndex: 1,
              }}
            />
          );
        })}

        {/* <Circle
          center={{ lat: 40.754932, lng: -73.9840162 }}
          radius={5000}
          options={{
            strokeColor: "#66009a",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: `#66009a`,
            fillOpacity: 0.35,
            zIndex: 1,
          }}
        /> */}
      </GoogleMap>
    </LoadScript>
  );
};

export default CarMap;
