import LoadingWrapper from "./LoadingWrapper"

function Loading({width = 60}:{width?:number}) {
    return (
      <LoadingWrapper>
        <div className='loader' style={{width: width+"px"}} ></div>
      </LoadingWrapper>
    )
  }
  
  export default Loading