package pl.szczypkowski.electronicshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pl.szczypkowski.electronicshop.entity.Country;
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface CountryRepo extends JpaRepository<Country,Long> {
}
