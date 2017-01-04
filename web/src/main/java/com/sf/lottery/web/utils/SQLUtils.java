package com.sf.lottery.web.utils;

import com.sf.lottery.common.utils.StrUtils;

import java.io.*;

/**
 * @author Hash Zhang
 * @version 1.0.0
 * @date 2016/12/2.
 */
public class SQLUtils {
    public static void main(String[] args) {
        BufferedReader br = null;
        try {
            //构造BufferedReader对象
            br = new BufferedReader(new FileReader("d:\\user\\862911\\桌面\\1.txt"));
            BufferedWriter writer = null;
            writer = new BufferedWriter(new FileWriter("d:\\user\\862911\\桌面\\1.out"));
            String line = null;
            while ((line = br.readLine()) != null) {
                String[] split = line.split("\t");
                writer.write(StrUtils.makeString("insert into sf_user(sf_num,sf_name) values ('",Integer.parseInt(split[0].replace("\uFEFF","").trim()),"','",split[1].trim(),"');"));
                writer.newLine();
            }
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //关闭BufferedReader
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
    }
}
