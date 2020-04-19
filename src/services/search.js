/**
 * @description 搜索 service
 */

const {
  User_Search,
  Supplier_Info,
  Animal_Info,
  Farm_Info
} = require("@db/model");
const Op = require("Sequelize").Op;

/**
 * 获取用户的历史查询信息
 * @param {int} id
 */
async function getHistorySearch(id) {
  const result = await User_Search.findAll({
    where: {
      userId: id
    },
    limit: 5,
    order: [["createdAt", "DESC"]]
  });
  return result;
}

/**
 * 获取用户最新的历史查询信息
 * @param {int} id
 */
async function getLatestHistorySearch(id) {
  const result = await User_Search.findAll({
    where: {
      userId: id
    },
    order: [["createdAt", "DESC"]]
  });
  return result;
}

/**
 * 新增顾客历史搜索记录
 * @param {string} query
 * @param {int} id
 */
async function addHistorySearch(id, query) {
  const result = await User_Search.create({
    userId: id,
    content: query
  });
  return result;
}

/**
 * 删除顾客历史搜索记录
 * @param {int} userId
 * @param {int} contentId
 */
async function deleteHistorySearch(contentId, userId) {
  let res = await User_Search.destroy({
    where: {
      userId: userId,
      id: contentId
    }
  });
  return res;
}

/**
 * 查询数据库
 * @param {string} query
 */
async function searchByKeyWord(query) {
  let result = {};
  let supplierRes = await Supplier_Info.findAll({
    where: {
      username: {
        [Op.like]: `%${query}%`
      }
    }
  });
  if (supplierRes.length > 0) {
    handleSearchData(supplierRes, 1);
    result.supplier = supplierRes;
  } else {
    result.supplier = [];
  }
  // 查询农场
  let farmRes = await Farm_Info.findAll({
    where: {
      farmName: {
        [Op.like]: `%${query}%`
      }
    }
  });
  if (farmRes.length > 0) {
    handleSearchData(farmRes, 2);
    result.farm = farmRes;
  } else {
    result.farm = [];
  }
  // 查询动物
  const AnimalRes = await Animal_Info.findAll({
    where: {
      goodName: {
        [Op.like]: `%${query}%`
      }
    }
  });
  if (AnimalRes.length > 0) {
    handleSearchData(AnimalRes, 3);
    result.animal = AnimalRes;
  } else {
    result.animal = [];
  }
  if (result) {
    return result;
  }
}

function handleSearchData(data, type) {
  // 商家
  for (let i = 0; i < data.length; i++) {
    if (data && data[i] && data[i].dataValues) {
      data[i].dataValues.type = type;
    }
  }
}

module.exports = {
  getHistorySearch,
  addHistorySearch,
  searchByKeyWord,
  getLatestHistorySearch,
  deleteHistorySearch
};
