const baseUrl = "https://jewelry243-api.herokuapp.com/api";
const pathArray = window.location.pathname.split('/');
const urlParams = new URLSearchParams(window.location.search);

function getLocalAccessToken() {
    return localStorage.getItem("access_token");
}

function getLocalRefreshToken() {
    return localStorage.getItem("refresh_token");
}

function clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
}

function refreshToken() {
    return instance.post("/auth/refresh-token", {
        refreshToken: getLocalRefreshToken(),
    });
}

async function logout() {
    await instance.post("/auth/logout", {
        refreshToken: getLocalRefreshToken(),
    });
    clearToken();
    window.location = "/admin/login";
}

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    }, async (err) => {
        const originalConfig = err.config;
        if(err.response.status === 401 && originalConfig.url === "/auth/refresh-token"){
            clearToken();
            window.location = "/admin/login";
            return Promise.reject(err);
        }
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await refreshToken();
                    const { accessToken } = rs.data;
                    localStorage.setItem("access_token", accessToken);
                    instance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
                    return instance(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403) {
                clearToken();
                window.location = "/admin/login";
                //return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);

function renderCategory(category) {
    return `<option value="${category.code}">${category.name}</option>`;
}

function renderGoldType(goldType) {
    return `<option value="${goldType.percentage}">${goldType.percentage}%</option>`;
}

function renderSupplier(supplier) {
    return `<option value="${supplier.code}">${supplier.name}</option>`;
}

var errorMap = new Map();

function addErrorToMap(errors) {

    if(errorMap.size !== 0) {
        errorMap.clear();
    }

    errors.map((error) => {
        errorMap.set(error.field, error.defaultMessage);
    });
}

function renderError() {
    errorMap.forEach((message, field) => {
        $('#error-' + field).text(message).css('display', 'block');
        $('#' + field).css('border', '1px solid red');
        $('span[aria-labelledby="select2-' + field + '-container"]').css('border', '1px solid red');
    });
}

function removeError() {
    errorMap.forEach((message, field) => {
        $('#error-' + field).text('').css('display', 'none');
        $('#' + field).css('border', '.0625rem solid #e7eaf3');
        $('span[aria-labelledby="select2-' + field + '-container"]').css('border', '.0625rem solid #e7eaf3');
    });
}

function isNumeric(value) {
    const regex = /^[0-9]+$/;
    return value.match(regex);
}

function isBlank(value) {
    return value == null || value.trim().length === 0;
}

function validation(dto, avatar) {

    const errors = [];

    if(isBlank(dto.name))
        errors.push({field: 'name', defaultMessage: 'T??n s???n ph???m kh??ng ???????c b??? tr???ng'});

    if(isBlank(dto.goldWeight))
        errors.push({field: 'goldWeight', defaultMessage: 'Tr???ng l?????ng kh??ng ???????c b??? tr???ng'});
    else if(!isNumeric(dto.goldWeight))
        errors.push({field: 'goldWeight', defaultMessage: 'Tr???ng l?????ng ph???i l?? s???'});

    if(isBlank(dto.costPrice))
        errors.push({field: 'costPrice', defaultMessage: 'Gi?? v???n kh??ng ???????c b??? tr???ng'});
    else if(!isNumeric(dto.costPrice))
        errors.push({field: 'costPrice', defaultMessage: 'Gi?? v???n ph???i l?? s???'});

    if(isBlank(dto.price))
        errors.push({field: 'price', defaultMessage: 'Gi?? b??n kh??ng ???????c b??? tr???ng'});
    else if(!isNumeric(dto.price))
        errors.push({field: 'price', defaultMessage: 'Gi?? b??n ph???i l?? s???'});

    if(isBlank(dto.quantity))
        errors.push({field: 'quantity', defaultMessage: 'S??? l?????ng kh??ng ???????c b??? tr???ng'});
    else if(!isNumeric(dto.quantity))
        errors.push({field: 'quantity', defaultMessage: 'S??? l?????ng ph???i l?? s???'});

    if(isBlank(dto.supplierCode))
        errors.push({field: 'supplierCode', defaultMessage: 'Nh?? cung c???p kh??ng ???????c b??? tr???ng'});

    if(isBlank(dto.categoryCode))
        errors.push({field: 'categoryCode', defaultMessage: 'Lo???i s???n ph???m kh??ng ???????c b??? tr???ng'});

    if(isBlank(dto.goldType))
        errors.push({field: 'goldType', defaultMessage: 'Lo???i v??ng kh??ng ???????c b??? tr???ng'});

    if(avatar == null)
        errors.push({field: 'avatar', defaultMessage: '???nh ?????i di???n kh??ng ???????c b??? tr???ng'});

    return errors.length === 0 ? null : errors;
}