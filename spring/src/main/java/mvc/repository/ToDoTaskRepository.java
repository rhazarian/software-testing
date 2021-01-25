package mvc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mvc.model.ToDoTask;

@Repository
public interface ToDoTaskRepository extends JpaRepository<ToDoTask, Long> {

}
