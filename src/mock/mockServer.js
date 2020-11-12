import Mock from "mockjs";
import tableList from "./mockAPI/table/list.json";

/**Mock table数据*/
Mock.mock('mock/table/list', 'get', tableList);
