let params = {};

const params_dev = {};
const params_test = {};
const params_uat = {};
const params_pro = {};

switch (process.env.NODE_ENV) {
  case "development":
    params = params_dev;
    break;
  case "production":
    params = params_pro;
    break;
  case "dev":
    params = params_dev;
    break;
  case "test":
    params = params_test;
    break;
  case "uat":
    params = params_uat;
    break;
}

export default params;
