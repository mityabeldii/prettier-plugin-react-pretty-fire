// @ts-nocheck
const HelloWorld = () => {
    const borderWidth = '1px';
    
    return (
        <div className={`border`} another={`border`} style={`border`}>
            <h1 className={'border'} another={"border"} style={'border' + borderWidth}>Hello, world!</h1>
        </div>
    );
};

export default HelloWorld;
