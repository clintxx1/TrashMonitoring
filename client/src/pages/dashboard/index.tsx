import GoogleMapReact from 'google-map-react';

// const TrashMarkers = ({ text }: any) => <div className=''>{text}</div>;
const Dashboard = () => {
    const defaultProps = {
        center: {
            lat: 12.07123,
            lng: 124.59579
        },
        zoom: 25,
    };
    const mapOptions = {
        mapTypeId: 'satellite',
    };

    
    return (
        <div className='w-full h-full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={mapOptions}
            >
                {/* <TrashMarkers
                    lat={defaultProps.center.lat}
                    lng={defaultProps.center.lng}
                    text="My Marker"
                /> */}
            </GoogleMapReact>
        </div>
    );
}

export default Dashboard