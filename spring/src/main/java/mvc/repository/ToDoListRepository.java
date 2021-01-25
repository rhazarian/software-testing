package mvc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mvc.model.ToDoList;

@Repository
public interface ToDoListRepository extends JpaRepository<ToDoList, Long> {

}
