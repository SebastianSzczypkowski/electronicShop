package pl.szczypkowski.electronicshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pl.szczypkowski.electronicshop.entity.State;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "states",path = "states")
public interface StateRepo extends JpaRepository<State,Long> {

    List<State> findByCountryCode(@Param("code") String code);

}
