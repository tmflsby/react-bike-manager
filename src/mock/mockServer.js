import Mock from "mockjs";
import tableList from "./tableList";

Mock.mock('/table/list', 'get', tableList);
