import { ReactElement } from "react";
import LoadingSpinner from "./Loading";

function LoadingWrapper({
  children,
  className,
}: {
  children: ReactElement<typeof LoadingSpinner>;
  className?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 99,
        top: 0,
        left: 0,
        backgroundColor: '#ffffff59',
        backdropFilter: 'blur(3px)'
      }}
      className={`absolute flex justify-center items-center w-full h-full z-[99] top-0 left-0 bg-black/1 backdrop-blur-[3px] ${className}`}
    >
      {children}
    </div>
  );
}

export default LoadingWrapper;