module.exports = {
  pattern: /(^[a-z0-9\/-]+\/[a-z0-9]+\/RSS-ECOMM-\d{1,2}_\d{2}((-\d{1,2}_\d{2})?|(,\d{1,2}_\d{2})*)-[a-z-]+)|(^release\/[a-z-]+)/,
  errorMsg: 'Branch name is wrong format.',
};
