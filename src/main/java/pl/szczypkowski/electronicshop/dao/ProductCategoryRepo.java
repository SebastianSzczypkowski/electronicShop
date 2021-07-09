package pl.szczypkowski.electronicshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.szczypkowski.electronicshop.entity.ProductCategory;

@RepositoryRestResource(collectionResourceRel = "productCategory",path = "product-category")
@CrossOrigin(origins = "http://localhost:4200")
public interface ProductCategoryRepo extends JpaRepository<ProductCategory,Long> {
}
