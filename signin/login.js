let setLoading = false;
// let online;
let setPassword = false;


const togglePassword = () => {
    const userPassword = document.getElementById('inputpassword')
    if (userPassword.type === "password") {
        userPassword.type = "text"
    }
    else {
        userPassword.type = "password";
    }
};

const clearSession = async () => {
    sessionStorage.removeItem("auth");
    // window.location.reload()
}



function login() {
    try {
        const payload = {
            email: '',
            password: ''
        }
        setLoading = true
        const email = $('#username').val();
        const password = $('#password').val();
        payload.email = email
        payload.password = password

        const users = JSON.parse(localStorage.getItem('permission')) || [];
        const user = users.find(x => x.email === email)
        console.log("user", user)

       if (user) {
            if (user.password !== payload.password) {
                setLoading = false,
                    $.notify('Invalid Credentails','error')
                return;
            }
            setLoading = false;

            onLogin(user, setLoading, payload);
        
       } else {
            const url = 'https://p2p-inventory.onrender.com/api/auth/login';           
            $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function(data) {
                console.log('Login successful:', data);
                // You can redirect or perform other actions based on the response data.
                const newResp = {
                    businessCode: '',
                    businessName: '',
                    businessSetting: {},
                    email: '',
                    fullName: '',
                    password: '',
                    userId: '',
                    token: '',
                    location: ''
                }
                if (data.token) {
                    newResp.location = data.location
                    newResp.businessSetting = data.businessSetting
                    newResp.businessName = data.businessName
                    newResp.businessCode = data.businessCode
                    newResp.email = data.email
                    newResp.password = password
                    newResp.fullName = data.fullName
                    newResp.userId = data.userId
                    newResp.token = data.token
                    const updateUsers = [...users, newResp];
                    localStorage.setItem('permission', JSON.stringify(updateUsers))
                    setLoading = false;
                    onLogin(newResp, setLoading, payload);
                    console.log('HTYY', newResp)
                } else {
                    setLoading = false;
                    return $.notify('invalid Credentials','error')

                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);

                if (jqXHR.status) {
                console.log('Actual HTTP Status Code:', jqXHR);
                // You can log or handle the specific HTTP status code here
                }

                // Handle errors, show an alert, or perform other actions.
            }
            });
       }
        
    } catch (error) {
        
    }
    
  }



function onLogin(payload, setLoading, user) {
    try {
        // setLoading = true;
        // // if (payload.email) {
        if (user) {
            console.log('yti', user)
            window.sessionStorage.setItem('auth', JSON.stringify(payload));
            window.location.href = "../offlinesaleshop.html";
        } else {
            if (payload) {
                console.log('payload', payload)
                // setLoading = false;
                window.sessionStorage.setItem('auth', JSON.stringify(payload));
                window.location.href = "../offlinesaleshop.html";
            }
            // }
            // setLoading = false
        }
    }
    catch (error) {
        setLoading = false
        console.log(error);
    }

}
