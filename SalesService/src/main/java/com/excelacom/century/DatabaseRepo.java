/**
 * @author Sridharan Murugadass
 *
 */
package com.excelacom.century;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;
import com.excelacom.century.Database;

@Transactional
public interface DatabaseRepo extends MongoRepository<Database, String> {

}
