import { GoogleLogin } from "@react-oauth/google";

export const GoogleAuthButton = ({ onSuccess, onError, disabled }) => {
  return (
    <div className="min-h-[40px]">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap={false}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="350"
      />
    </div>
  );
};

