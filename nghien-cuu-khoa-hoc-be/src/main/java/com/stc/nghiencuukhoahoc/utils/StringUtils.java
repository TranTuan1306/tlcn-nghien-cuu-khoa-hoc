package com.stc.nghiencuukhoahoc.utils;

import org.apache.commons.io.FilenameUtils;

import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.regex.Pattern;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2019-11-13.
 * Time: 15:54.
 * Filename: StringUtils.
 */
public class StringUtils {
    public static String removeAccentJava(String s) {
        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("").replace('đ','d').replace('Đ','D');
    }

    public static String optimizeFilename(String filename) {
        return String.format("%s-%d.%s", removeAccentJava(FilenameUtils.getBaseName(filename)),
                System.currentTimeMillis(), FilenameUtils.getExtension(filename));
    }

    public static String generateFileName() {
        Random random = new Random();
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < 20; i++) {
            result.append(random.nextInt(26) + 'a');
        }
        result.append(new SimpleDateFormat("ddMMyyyyHHmmss").format(new Date()));
        return result.toString();
    }
}
