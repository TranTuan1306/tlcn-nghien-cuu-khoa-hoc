package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.CauHinhEmail;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/28/2021
 * Time: 4:03 PM
 * Filename: CauHinhEmailRepository
 */
public interface CauHinhEmailRepository extends MongoRepository<CauHinhEmail,String> {
}
