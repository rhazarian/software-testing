package mvc;

import org.junit.ClassRule;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.containers.PostgreSQLContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.Transactional;

import mvc.model.ToDoList;
import mvc.model.ToDoTask;
import mvc.repository.ToDoListRepository;
import mvc.repository.ToDoTaskRepository;
import mvc.service.ToDoService;

@SpringBootTest
@Testcontainers
public class ToDoServiceContainerTests {
    @Autowired
    ToDoListRepository toDoListRepository;
    @Autowired
    ToDoTaskRepository toDoTaskRepository;

    @Autowired
    ToDoService toDoService;

    @ClassRule
    @Container
    private static final PostgreSQLContainer postgreSQLContainer =
            new PostgreSQLContainer<>("postgres:12.4").withDatabaseName("postgres")
                    .withUsername("postgresql").withPassword("admin");

    static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        @Override
        public void initialize(ConfigurableApplicationContext ac) {
            TestPropertyValues.of(
                    String.format("spring.datasource.url=%s", postgreSQLContainer.getJdbcUrl()),
                    String.format("spring.datasource.username=%s", postgreSQLContainer.getUsername()),
                    String.format("spring.datasource.password=%s", postgreSQLContainer.getPassword())
            ).applyTo(ac.getEnvironment());
        }
    }

    @Test
    @Transactional
    public void testMarkDone() {
        final ToDoList list = new ToDoList();
        list.setName("Test List");
        toDoListRepository.save(list);
        final ToDoTask task = new ToDoTask();
        task.setName("Test Task");
        task.setDone(false);
        task.setList(list);
        toDoTaskRepository.save(task);

        toDoService.markTask(task.getId());

        Assertions.assertTrue(toDoTaskRepository.getOne(task.getId()).isDone());
    }
}
