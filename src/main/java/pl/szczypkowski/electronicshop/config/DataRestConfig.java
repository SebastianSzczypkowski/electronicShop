package pl.szczypkowski.electronicshop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import pl.szczypkowski.electronicshop.entity.*;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Value("http://localhost:4200")
    private String[] theAllowedOrigins;

    private EntityManager entityManager;
    @Autowired
    public DataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsuportedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE,HttpMethod.PATCH};

        disableHttpMethods(Product.class,config, unsuportedActions);
        disableHttpMethods(ProductCategory.class,config, unsuportedActions);
        disableHttpMethods(Country.class,config, unsuportedActions);
        disableHttpMethods(State.class,config, unsuportedActions);
        disableHttpMethods(Order.class,config, unsuportedActions);
        exposeIds(config);

       // cors.addMapping("/api/**").allowedOrigins("http://localhost:4200");
        cors.addMapping(config.getBasePath()+"/**").allowedOrigins(theAllowedOrigins);

    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] unsuportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsuportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsuportedActions)));
    }
    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entites = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();
        for(EntityType tempEntityType: entites)
        {
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class[] domainTypes= entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
