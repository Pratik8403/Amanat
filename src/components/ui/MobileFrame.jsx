// App container that mimics an actual phone inside desktop
export default function MobileFrame({ children }) {
  return (
    <div className="device-frame">
      <div className="fake-notch" />
      <div className="app-screen">
        {children}
      </div>
    </div>
  );
}
