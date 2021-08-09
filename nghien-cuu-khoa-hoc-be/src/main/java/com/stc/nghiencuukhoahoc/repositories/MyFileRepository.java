package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.MyFile;
import org.springframework.data.mongodb.repository.MongoRepository;



/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/4/2021
 * Time: 9:43 AM
 * Filename: FileRepository
 */
public interface MyFileRepository extends MongoRepository<MyFile, String> {
}
