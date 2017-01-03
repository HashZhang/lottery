package com.sf.lottery.service;

import com.sf.lottery.common.vo.CpGiftVo;

import java.util.List;

/**
 * Created by 01139954 on 2016/12/11.
 */
public interface CoupleService {
    List<CpGiftVo> getAllCouple();

    List<CpGiftVo> getAllAwardCouple();

    List<CpGiftVo> getAllUnAwardCouple();

    CpGiftVo getLuckCP();

    boolean deleteCouple(int coupleId);

    boolean isCpSign(int sfNum);

    int unConfirmCPImg(int coupleId);

    int confirmCPImg(int coupleId);

    boolean resetCouple() throws Exception;
}
