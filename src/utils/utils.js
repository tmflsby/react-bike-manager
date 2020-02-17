export default {
  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => `共${data.result.total}条`,
      showQuickJumper: true
    };
  }
}
