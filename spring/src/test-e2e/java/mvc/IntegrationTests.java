package mvc;

import org.junit.jupiter.api.Test;

import java.util.UUID;

import static com.codeborne.selenide.Condition.exist;
import static com.codeborne.selenide.Selectors.byAttribute;
import static com.codeborne.selenide.Selectors.withText;
import static com.codeborne.selenide.Selenide.element;
import static com.codeborne.selenide.Selenide.open;

public class IntegrationTests {
    @Test
    void addAndRemoveList() {
        final String listTitle = UUID.randomUUID().toString();

        open("http://localhost:8090/get-lists");
        element(byAttribute("data-test-id", "add-list_name-input")).append(listTitle);
        element(byAttribute("data-test-id", "add-list_submit")).click();
        element(withText(listTitle)).should(exist);
        element(withText(listTitle)).parent().find(byAttribute("data-test-id", "list_remove-submit")).click();
        element(withText(listTitle)).shouldNot(exist);
    }
}
