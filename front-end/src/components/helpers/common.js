let parseFB = () => {
    try {
        setTimeout(function () {
            if (window.FB)
                window.FB.XFBML.parse();
        }, 1000);
    } catch (e) {
        console.log(e);
    }
}

export default parseFB;