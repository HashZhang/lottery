package com.sf.lottery.dao;

import com.sf.lottery.common.model.Couple;

public interface CoupleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Couple record);

    int insertSelective(Couple record);

    Couple selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Couple record);

    int updateByPrimaryKey(Couple record);

    Integer isCpSignedByUserNum(int sfNum);

}