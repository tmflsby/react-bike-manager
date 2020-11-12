import Mock from "mockjs";
import tableList from "./tableList.json";

/**Mock table数据*/
Mock.mock('mock/table/list', 'get', tableList);
