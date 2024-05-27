'use client'

const Dialog = () => {
    const handleClick =()=> {
        UIkit.modal.confirm('UIkit confirm!').then(function() {
            console.log('Confirmed.')
        }, function () {
            console.log('Rejected.')
        });
    }
    return (
        <div>
            <button onClick={handleClick}>클릭</button>
        </div>
    );
};

export default Dialog;